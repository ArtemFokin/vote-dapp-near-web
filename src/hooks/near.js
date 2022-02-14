import { useContext } from "react";
import { NearContext } from "../components/NearProvider/NearProvider";
export const useNear = () => {
  const near = useContext(NearContext);
  return near;
};
