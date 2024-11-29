import { defineStore } from "pinia";
import axios from "axios";
import { ElMessage } from "element-plus";

const URL = "http://127.0.0.1:8080";

export const dataStore = defineStore("data", {
	state: () => ({
		isLoading: false,
		isAuthenticated: false,
		user: null,
		accessToken: null,
		userList: null,
		bookList: null,
	}),
	persist: true,
	actions: {
		setUser(data: any) {
			this.user = data;
			this.isAuthenticated = true;
		},
		setToken(data: any) {
			this.accessToken = data;
		},
		setUserList(data: any) {
			this.userList = data;
		},
		setBookList(data: any) {
			this.bookList = data;
		},
		signOut() {
			this.user = null;
			this.accessToken = null;
			this.isAuthenticated = false;
			this.message('success', 'You are signed out!');
			navigateTo("/signin", {replace: true});
			console.log("Sign out successful!");
		},
		message(type: string, msg:any) {
			if (type === "success") {
				return ElMessage({
					message: msg,
					type: "success",
				});
			}else if (type === "error") {
				return ElMessage({
               message: msg,
               type: "error",
            });
			}
		},
		// sign in
		async signIn(signInForm: any) {
			try {
				this.isLoading = true;
				const response = await axios.post(`${URL}/api/signin`, signInForm);
				this.setUser(response.data);
				// this.setToken(response.data.token);
				// this.message('success', response.data.message);
				navigateTo("/profile", {replace: true});
				console.log("Sign in successful!", this.user);
				console.log("Access token: ", this.accessToken);
				console.log("User name: ", response.data);
				// console.log("Access token: ", this.accessToken);
				// const response = await axios.post(`${URL}/user/users/signin/`, signInForm);
				// this.setUser(response.data.user_data);
				// this.setToken(response.data.access_token);
				// this.message('success', response.data.message);
				// navigateTo("/", {replace: true});
				// console.log("Sign in successful!", this.user.username);
				// console.log("Access token: ", this.accessToken);
			} catch (error: any) {
				if (error.response) {
					this.message('error', error.response.data);
					console.error("Sign-in error:", error.response.data);
				} else {
					this.message('error', error.message);
					console.error("Error occurred:", error.message);
				}
			}
			this.isLoading = false;
		},
		// sign up
		async signUp(signUpForm: any) {
			try {
				const response = await axios.post(`${URL}/api/signup`, signUpForm);
				this.message('success', response.data);
				navigateTo("/signin");
				console.log("Sign up successful!", response.data);
				// const response = await axios.post(`${URL}/user/users/signup/`, signUpForm);
				// this.message('success', response.data.message);
				// navigateTo("/signin");
				// console.log("Sign up successful!");
			} catch (error: any) {
				if (error.response) {
					this.message('error', error.response.data);
					console.error("Sign-up error:", error.response.data);
				} else {
					this.message('error', 'Sign-up failed! Please check your credentials!');
					console.error("Error occurred:", error.message);
				}
			}
		},
		// get user list
		async getUserList(token: string) {
			try {
				const response = await axios.get(`${URL}/user/users/`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				this.setUserList(response.data);
				this.message('success', 'Get User list successful!');
			} catch (error: any) {
				if (error.response) {
					this.message('error', 'Get User list fail!');
					console.error("Get user list fail:", error);
				} else {
					this.message('error', error.message);
					console.error("Error occurred:", error.message);
				}
			}
		},
		// get book list
		async getBookList() {
			try {
				const response = await axios.get(`${URL}/books/`);
				this.setBookList(response.data);
				this.message('success', 'Get book list successful!');
			} catch (error: any) {
				if (error.response) {
					this.message('error', `Get books error: ${error.response.data}`);
					console.error("Get book list error:", error);
				} else {
					this.message('error', "Get books failed!");
					console.error("Error occurred:", error.message);
				}
			}
		},
	},
});
