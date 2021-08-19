import firestore from '@react-native-firebase/firestore';

export const addUser = async (name, email, phone) => {
  const data = await firestore()
    .collection('users')
    .where('phone', '==', phone)
    .get();

  console.log(data.docs);

  if (data.docs.length > 0 && data.docs[0].exists) {
    return 'exists';
  }

  const userDoc = await firestore().collection('users').add({
    username: name,
    email: email,
    phone: phone,
    type: 'learner',
  });

  await firestore()
    .collection('users')
    .doc(userDoc.id)
    .update({uid: userDoc.id});

  await firestore().collection('learnerProfiles').add({
    uid: userDoc.id,
    username: name,
    email: email,
    phone: phone,
    skills: [],
    interests: [],
  });
  return 'registered';
};
