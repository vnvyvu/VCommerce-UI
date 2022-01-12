import axios from 'axios';
import { userActions } from '../features/user/user.slice';
import { isUserAuthenticated } from '../redux/middleware/localState.middleware';
import store from '../redux/store';
import { authService } from './auth.service';
/**
 * withCredentials được đặt thành true giúp request được tự động gắn
 * thêm các trường xác thực như cookie, authorization header, TLS client certificate
 * vì vậy ta cũng không cần trả về token ở phía api server
 * và cũng không cần thực hiện thủ công việc lưu token ở phía client
 */
const client = axios.create({
	baseURL: 'http://localhost:8008/',
	responseType: 'json',
	withCredentials: true,
});
/**
 * Middleware chặn phản hồi từ phía server,
 * giúp xử lý trường hợp hết hạn token, server trả về lỗi 401
 */
client.interceptors.response.use(
	/**
	 * Đối với các response bình thường, không cần xử lý chúng
	 * @param {*} res
	 * @returns
	 */
	(res) => res,
	/**
	 * Đối với lỗi được trả về, thực hiện xử lý lỗi
	 * @param {*} err
	 * @returns
	 */
	async (err) => {
		/**
		 * Lấy ra request config
		 * Bắt lỗi 401, chèn thêm thuộc tính _retry để không cho phép lặp gây ra
		 * hiện tượng lặp vô hạn.
		 * Nếu user đã xác thực trước đó rồi, thực hiện gọi API refresh token,
		 * dữ liệu trả về là thông tin người dùng sẽ được cập nhật vào Redux,
		 * thực hiện request lại.
		 * Nếu user chưa xác thực, có thể đúng là như vậy nhưng cũng có thể
		 * là dữ liệu trong localstorage bị mất, thực hiện hành động logout
		 * Các lỗi khác sẽ được trả về thông thường bằng Promise.reject(err)
		 */
		if (err.response.status === 401 && !err.config._retry) {
			err.config._retry = true;
			const _id = localStorage.getItem('_id');
			if (isUserAuthenticated()) {
				const {
					user: { hashedPassword, ...payload },
					expiresIn,
				} = (await authService.refresh({ _id })).data;
				store.dispatch(userActions.update({ ...payload, expiresIn }));
				return client(err.config);
			} else store.dispatch(userActions.logout());
		} else {
			if (err.response.status === 401)
				store.dispatch(userActions.logout());
			return Promise.reject(err);
		}
	}
);

export const axiosClient = client;
export const axiosThunk = async (payload, ThunkAPI, axiosServiceMethod) => {
	try {
		return (await axiosServiceMethod(payload)).data;
	} catch (err) {
		return ThunkAPI.rejectWithValue(err.response.data.errors);
	}
};
