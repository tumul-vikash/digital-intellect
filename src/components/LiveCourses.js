import firestore from '@react-native-firebase/firestore';

export const createLiveCourse = async (
  topic,
  description,
  date,
  time,
  uid,
  username,
  tid,
  color,
) => {
  const data = await firestore().collection('liveCourses').add({
    topic: topic,
    description: description,
    date: date,
    time: time,
    uid: uid,
    username: username,
    tid: tid,
    status: 0,
    color: color,
  });
};

export const getLiveCourseDetails = async (id) => {
  const data = await firestore().collection('liveCourses').doc(id).get();
  return data;
};
