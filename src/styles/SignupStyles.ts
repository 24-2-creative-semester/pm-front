import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#1D1B20",
    paddingHorizontal: 24,
    paddingVertical: 11,
  },
  title: {
    margin: 24,
    marginTop: 70,
    color: "#1D1B20",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
  },
  backButton: {
    position: "absolute",
    top: 20,
    padding: 10,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 15,
    color: "#1D1B20",
  },  
  label: {
    marginLeft: 24,
    color: "#1D1B20",
    fontSize: 16,
    marginBottom: 8,
  },
  genderContainer: {
    marginLeft: 24,
    marginRight: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  genderButton: {
    width: 150,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#625E67",
    borderRadius: 8,
  },
  selectedGenderButton: {
    backgroundColor: "#6F6CFF",
  },
  genderButtonText: {
    color: "#BABABA",
    fontSize: 16,
  },
  selectedGenderButtonText: {
    color: "#1D1B20",
  },
  input: {
    marginLeft: 24,
    marginRight: 24,
    height: 56,
    backgroundColor: "#625E67",
    borderRadius: 8,
    paddingHorizontal: 20,
    color: "#1D1B20",
    marginBottom: 24,
  },
  inputPwd: {
    marginLeft: 24,
    marginRight: 24,
    height: 56,
    backgroundColor: "#625E67",
    borderRadius: 8,
    paddingHorizontal: 20,
    color: "#1D1B20",
    marginBottom: 8,
  },
  passwordHint: {
    marginLeft: 24,
    marginRight: 24,
    color: "#BABABA",
    fontSize: 12,
    marginBottom: 20,
  },
  submitButton: {
    marginLeft: 24,
    marginRight: 24,
    height: 56,
    backgroundColor: "#6F6CFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 67,
  },
  disabledSubmitButton: {
    backgroundColor: "#6F6CFF4D", // 흐린 버튼 색상
  },
  submitButtonText: {
    color: "#1D1B20",
    fontSize: 20,
    fontWeight: "600",
  },
  disabledSubmitButtonText: {
    color: "#1D1B2080", // 흐린 텍스트 색상
  },
});

export default styles;
