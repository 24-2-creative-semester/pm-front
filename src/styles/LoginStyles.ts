import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1b1e",
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
    marginBottom: 15,
  },
  loginButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#7d5fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupPrompt: {
    color: "#888",
    marginBottom: 10,
  },
  signupButton: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#7d5fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  signupButtonText: {
    color: "#7d5fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "#444",
    marginVertical: 10,
  },
  socialLoginContainer: {
    alignItems: "center",
  },
  socialLoginText: {
    color: "#888",
    marginBottom: 10,
  },
  kakaoButton: {
    backgroundColor: "#ffe812",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
