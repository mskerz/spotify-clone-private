import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth,googleProvider } from "@/libs/firebase/client";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth";
import { User } from "@/types/user";
import { FormLoginType, FormRegisterType } from "@/types/form";
 
export const SignUp = createAsyncThunk<
  void,
  FormRegisterType,
  { rejectValue: string }
>("auth/signup", async (formData, { rejectWithValue }) => {
  try {
    
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password,
    );

    
    await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebase_uid: userCredential.user.uid,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        phoneNumber: formData.phoneNumber,
        birthday: formData.birthday,
      }),
    });
  } catch (error) {
      if (error instanceof Error) {

        if (error.message.includes("email-already-in-use")) {
          return rejectWithValue("Email already in use");
        }
      }
    return rejectWithValue("Invalid email or password");
  }
});

export const SignIn = createAsyncThunk<
  User,
  FormLoginType,
  { rejectValue: string }
>("auth/signin", async (credentials, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password,
    );
    const idToken = await userCredential.user.getIdToken();
    const res = await fetch("/api/auth/sync", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    const data = await res.json();
    return data.user;
  } catch (error) {
    return rejectWithValue("Invalid email or password");
  }
});

export const checkUserSession = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>("auth/authStateChanged", async (_, { rejectWithValue }) => {
  try {
    const user = await new Promise<NonNullable<typeof auth.currentUser> | null>(
      (resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe(); // unsubscribe ทันทีที่ได้ user
          resolve(user);
        });
      },
    );
    if(!user) return null;

    const idToken = await user.getIdToken();
    const res = await fetch("/api/auth/sync", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    const data = await res.json();
    return data.user;
  } catch (error) {
    return rejectWithValue("Error authenticating");
  }
});

export const signOutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/signout", async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
  } catch (error) {
    return rejectWithValue("Error signing out");
  }
});


export const SignInWithGoogle =  createAsyncThunk<
User,
void,
{rejectValue :string}>  
("auth/googleSignIn",async (_, { rejectWithValue }) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    const res = await fetch("/api/auth/sync", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    const data = await res.json();
    return data.user;
  } catch (error) {
    if(error instanceof Error){
      return rejectWithValue(error.message);
    }
  }
})