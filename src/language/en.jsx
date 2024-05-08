
export const en = {
  common: {
    button: {
      login: "Login",
      reissue: "Reissue",
    },
  },
  Login: {
    pageTitle: "Login",
    pageSubTitle: "Welcome to ... nursing house!",
    label: {
      username: "Username",
      email: "Login mail",
      password: "Password",
    },
    placeholder: {
      username: "Please enter your Login ID",
      email: "Please enter your email",
      password: "Please enter your password",
    },
    message: {
      username: "Login ID is required item",
      emailRequired: "Email is required item",
      emailInvalid: "Invalid format email",
      password: "Password is required item",
      invalidCredential: "Invalid credentials. Please try again.",
      loginError:"An error occurred while processing your request. Please try again later."
    },
    link: {
      forgetPassword: "Forget password?",
      register: "Register new account?",
    },
  },
  Register: {
    pageTitle: "Register",
    pageSubTitle: "Welcome to ... nursing house!",
    label: {
      username: "Username",
      yourName: "Your name",
      email: "Email",
      phone: "Phone",
      password: "Password",
      confirmPassword: "Confirm Password"
    },
    placeholder: {
      username: "Please enter your Login ID",
      email: "Please enter your email",
      password: "Please enter your password",
      confirmPassword: "Please enter confirm password",
    },
    message: {
      username: "Username is required item",
      name: "Name is required item",
      nameTooShort: "Name must be at least 2 characters",
      phoneRequired: "Phone is required item",
      phoneInvalid: "Invalid format phone number",
      emailRequired: "Email is required item",
      emailInvalid: "Invalid format email",
      emailExisted: "Email is already exist",
      password: "Password is required item",
      passwordTooShort: "Password must be at least 8 characters",
      passwordInvalid: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      passwordNotMatch: "Passwords does not match",
      confirmPassword: "Confirm Password is required item",
      registerError:"An error occurred while processing your request. Please try again later."
    },
    link: {
      login: "Login to your account",
    },
  },
  pages404: {
    text: {
      pages: "Page not found",
      Message: "Sorry, we couldn’t find the page you’re looking for.",
    },
    link: {
      home: "Go back home",
      support: "Contact support",
    },
  },
  Header: {
    text: [
      { page: "page01", link: "/page01" },
      { page: "page02", link: "/page02" },
      { page: "page03", link: "/page03" },
      { page: "page04", link: "/page04" },
    ],
  },
  Language: {
    text: "Tiếng Việt",
    key: "/lang/nv",
  },
 
  Notification: [
    {
      name: "success",
      message: "Success",
      description: "This is a success notification.",
    },
    {
      name: "info",
      message: "Info",
      description: "This is an info notification.",
    },
    {
      name: "warning",
      message: "Warning",
      description: "This is a warning notification.",
    },
  ],
  ErrorPage: [
    {
      code: "404",
      title: "Oops! 404 Error",
      message: "Page Not Found",
      description:
        "The page you are looking for might have been removed had its name changed or is temporarily unavailable.",
      nameButton: "Back to Home Page",
    },
    { code: "500", message: "bcd" },
  ],
};
