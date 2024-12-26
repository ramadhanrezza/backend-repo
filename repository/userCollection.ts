import { firestore } from '../config/firebaseConfig';
import { User, UserUpdateDTO } from '../entities/user';

export const updateUser = async (userId: string, userData: UserUpdateDTO): Promise<User> => {
  try {
    const userRef = firestore.collection('USERS').doc(userId);
    
    await userRef.set({
      ...userData,
      updatedAt: new Date()
    }, { merge: true });

    const updatedDoc = await userRef.get();
    return { 
      id: userId, 
      ...updatedDoc.data() 
    } as User;
  } catch (error) {
    throw new Error(`Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const fetchUser = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await firestore.collection('USERS').doc(userId).get();
    
    if (!userDoc.exists) {
      return null;
    }

    return { 
      id: userId, 
      ...userDoc.data() 
    } as User;
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};