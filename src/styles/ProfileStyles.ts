import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 20,
  },
  icon: {
    width: 40, // 아이콘 너비
    height: 40, // 아이콘 높이
    marginBottom: 10, // 텍스트와 아이콘 간의 간격
    resizeMode: "contain", // 이미지 비율 유지
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: "left",
  },
  inputContainer: {
    marginBottom: 15, // 입력 필드와의 간격
  },
  label: {
    color: "#fff", // 라벨 텍스트 색상
    fontSize: 16, // 라벨 텍스트 크기
    marginBottom: 5, // 입력 필드와 간격
  },
  input: {
    backgroundColor: "#444", // 입력 필드 배경색
    color: "#fff", // 입력 텍스트 색상
    borderRadius: 8,
    padding: 15,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6366F1',
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    color: '#fff',
    fontSize: 16,
  },
  subTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  dietTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dietType: {
    width: '48%',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  iconText: {
    color: '#ccc',
  },
  submitButton: {
    backgroundColor: '#6366F1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default style;