import axios, { AxiosError } from "axios";
import { GetPoliciesParams, Policy } from "../types";

const fetchPolicies = async (
  params: GetPoliciesParams,
  cb: (policies: Policy[]) => void
): Promise<void> => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/policies`, { params })
    .then((res: any) => {
      const policies = res.data?.policies;
      cb(policies);
    })
    .catch((error: Error | AxiosError): never => {
      console.log(error);
      throw error;
    });
};

export default fetchPolicies;
