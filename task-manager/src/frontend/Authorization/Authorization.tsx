import authTemplate from './Authorization.html?raw';
import './Authorization.css';
import { register, login } from '../services/auth-service';

export class Authorization {
    private container: HTMLElement;
    private authForm: HTMLFormElement | null = null;
    private usernameInput: HTMLInputElement | null = null;
    private passwordInput: HTMLInputElement | null = null;
    private submitBtn: HTMLButtonElement | null = null;
    private toggleLink: HTMLAnchorElement | null = null;
    private authMessage: HTMLElement | null = null;
    private isLoginMode: boolean = true;

    // The main path to navigate to after logging in
    private MAIN_PATH = "/tasks";
    private MISSING_FIELDS_WARNING = "Username and password are required!";
    private LOGIN_SUCCESSFUL_MSG = "Login successful! Redirecting now..";
    private REG_SUCCESSFUL_MSG = "Registration successful! Please login.";
    private AUTH_ERROR_MSG = "Authentication failed: ";
    private LOGIN_BTN = "Sign In";
    private REGISTER_BTN = "Register";

    // Delay before redirecting to MAIN_PATH
    private REDIRECT_TIMEOUT = 100;

    constructor(container: HTMLElement) {
        this.container = container;
        this.initTemplate();
    }

    private initTemplate(): void {
        this.container.innerHTML = authTemplate;

        this.authForm = this.container.querySelector('#authForm') as HTMLFormElement;
        this.usernameInput = this.container.querySelector('#username') as HTMLInputElement;
        this.passwordInput = this.container.querySelector('#password') as HTMLInputElement;
        this.submitBtn = this.container.querySelector('#authBtn') as HTMLButtonElement;
        this.toggleLink = this.container.querySelector('#toggleAuthMode') as HTMLAnchorElement;
        this.authMessage = this.container.querySelector('#authMessage') as HTMLElement;

        if (this.submitBtn && this.authForm) {
            this.submitBtn.addEventListener('click', (event) => {
                event.preventDefault();
                this.handleAuth();
            });
        }

        if (this.toggleLink) {
            this.toggleLink.addEventListener('click', (event) => {
                event.preventDefault();
                this.toggleAuthMode();
            });
        }
    }

    private async handleAuth(): Promise<void> {
        if (!this.usernameInput || !this.passwordInput || !this.authMessage) return;

        const username = this.usernameInput.value.trim();
        const password = this.passwordInput.value.trim();

        console.log(username);
        console.log(password);

        if (username.length === 0 || password.length === 0) {
            this.authMessage.textContent = this.MISSING_FIELDS_WARNING;
            return;
        }

        try {
            if (this.isLoginMode) {
                const response = await login(username, password);
                const token = response.data.token;

                localStorage.setItem('token', token);

                window.dispatchEvent(new Event("storage"));

                this.authMessage.textContent = this.LOGIN_SUCCESSFUL_MSG;

                setTimeout(() => {
                    window.location.href = this.MAIN_PATH;
                }, this.REDIRECT_TIMEOUT);
            } else {
                await register(username, password);
                this.authMessage.textContent = this.REG_SUCCESSFUL_MSG;
                this.toggleAuthMode();
            }
        } catch (error) {
            this.authMessage.textContent = this.AUTH_ERROR_MSG + (error)?.response?.data?.message;
        }
    }

    private toggleAuthMode(): void {
        if (!this.submitBtn || !this.authMessage) return;

        this.isLoginMode = !this.isLoginMode;
        this.submitBtn.textContent = this.isLoginMode ? this.LOGIN_BTN : this.REGISTER_BTN;
        this.authMessage.textContent = "";
    }

}
