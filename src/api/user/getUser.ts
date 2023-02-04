import { useEffect, useState } from "react";
import { User } from "../../type/TUser";

export const getSingleUser = async ()=>{
    const data = await fetch("https://fakestoreapi.com/users/1")
    .then((res) => {
      return res.json();
    })
    .catch(() => {
        // console.log("hello")
     return null
    });
    return data
}

 // Custom hook for fetchin user
 export const useFetchUser = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async (): Promise<User> => {
      return getSingleUser();
    };
    fetchUser().then((user) => setUser(user));
  }, []);
  return { user };
};