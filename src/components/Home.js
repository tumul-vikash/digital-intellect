import firestore from '@react-native-firebase/firestore';

export const updatePost = async (post) => {
  await firestore().collection('posts').add(post);
};
