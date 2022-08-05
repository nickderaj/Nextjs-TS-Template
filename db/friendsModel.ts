import { faker } from '@faker-js/faker';
import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, updateDoc } from '@firebase/firestore';
import { db } from './firebase-config';
// As I'm using Firebase, I don't need a complex backend or API routes (pages/api)
// Therefore I created this in a way similar to a Model in Node.js with a schema and CRUD methods
// Alternatively, it could be a class - I just thought this would be simpler
export interface IFriend {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
}

const friendsCollection = collection(db, 'friends');

export const getAllFriends = async () => {
  const data = await getDocs(query(friendsCollection, orderBy('name', 'asc')));
  if (!data) return [];
  return data.docs.map((doc) => {
    const { name, gender, age } = doc.data();
    return { friends: { id: doc.id, name, gender, age } };
  });
};

export const getAllFriendsWithLimit = async (numDocs: number) => {
  const allData = await getDocs(friendsCollection);
  const numberOfDocs = allData.docs.length;

  const data = await getDocs(query(friendsCollection, orderBy('name', 'asc'), limit(numDocs)));
  const docs = data.docs.map((doc) => {
    const { name, gender, age } = doc.data();
    return { id: doc.id, name, gender, age };
  });
  return { friends: docs, numFriends: numberOfDocs };
};

export const getFriendById = async (id: string) => {
  return await doc(db, 'friends', id);
};

export const createFriend = async (name: string, age: number, gender: 'Male' | 'Female' | 'Other') => {
  return await addDoc(friendsCollection, { name, age, gender });
};

export const updateFriend = async (id: string, name: string, age: number, gender: 'Male' | 'Female' | 'Other') => {
  const friend = await getFriendById(id);
  return await updateDoc(friend, { name, age, gender });
};

export const deleteFriend = async (id: string) => {
  const friend = await getFriendById(id);
  return await deleteDoc(friend);
};

// DEV TESTING METHODS (not to be used in production app):
export const seedFriends = async () => {
  for (let i = 0; i < 10; i++) {
    const name = faker.name.findName();
    const age = Math.floor(Math.random() * 113 + 1);
    const genders = ['Male', 'Female', 'Other'];
    const gender = genders[Math.floor(Math.random() * genders.length)];

    await addDoc(friendsCollection, { name, age, gender });
  }
};

export const deleteAllFriends = async () => {
  const data = await getDocs(friendsCollection);
  data.docs.map(async (doc) => {
    const friend = await getFriendById(doc.id);
    await deleteDoc(friend);
  });
};
