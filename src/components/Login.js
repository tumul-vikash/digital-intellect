import firestore from '@react-native-firebase/firestore';

export const login = async (phone) => {
  const data = await firestore()
    .collection('users')
    .where('phone', '==', phone)
    .get();
  if (data.docs.length == 0) {
    return 'notRegistered';
  } else if (data.docs.length == 1) {
    return data;
  } else {
    return 'invalid';
  }
};

export const getUserProfile = async (phone) => {
  const userData = await firestore()
    .collection('learnerProfiles')
    .where('phone', '==', phone)
    .get();
  console.log(userData.docs[0].data());
  return userData;
};

export const getTeacherProfile = async (uid) => {
  const TeacherData = await firestore()
    .collection('teacherProfiles')
    .where('uid', '==', uid)
    .get();
  if (TeacherData.docs[0]) {
    console.log(TeacherData.docs[0].data());
  } else {
    console.log('does not exist');
  }
  return TeacherData;
};
