import { Request, Response } from 'express';
import { firestore, auth } from '../config/firebaseConfig';

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userDoc = await firestore.collection('USERS').doc(uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User  not found' });
    }

    return res.status(200).json({
      id: uid,
      ...userDoc.data()
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.uid;
    const userData = req.body;

    if (!uid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await firestore.collection('USERS').doc(uid).set(
      {
        ...userData,
        updatedAt: new Date()
      },
      { merge: true }
    );

    return res.status(200).json({ 
      message: 'User  data updated successfully',
      data: userData
    });
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};