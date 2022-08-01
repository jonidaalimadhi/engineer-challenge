import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import Badge from "./Badge";
import SearchBar from "./SearchBar";
import fetchPolicies from "../api/fetchPolicies";
import { TableHeaders } from "../utils/globals";
import { Policy, GetPoliciesParams } from "../types";

const Table = (): React.ReactElement<any, any> | null => {
  const [search, setSearch] = useState<string>("");
  const [policies, setPolicies] = useState<Array<Policy>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const renderHeaders = () => {
    return TableHeaders.map((label: string, index: number) => {
      return (
        <th
          key={index}
          scope="col"
          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
        >
          {label}
        </th>
      );
    });
  };

  const renderPolicies = (policies: Array<Policy>) => {
    if (policies.length > 0) {
      return policies.map((policy: any, index: number) => {
        const {
          id,
          customer,
          members = [],
          provider,
          insuranceType,
          status,
        } = policy;
        return (
          <tr key={index} className="border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {id}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {`${customer.firstName} ${customer.lastName}`}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {members.length
                ? members.map((member: any, index: number) => (
                    <Badge
                      key={index}
                      text={`${member.firstName} ${member.lastName}`}
                      randomizeColor={true}
                    />
                  ))
                : "-"}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {provider}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {insuranceType}
            </td>
            <td
              data-testid="status"
              className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
            >
              <Badge text={status} />
            </td>
          </tr>
        );
      });
    }
    return (
      <td className="text-sm border-b text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        No policies match this filter!
      </td>
    );
  };

  const debouncedFetchData = debounce(
    (params: GetPoliciesParams, callback: (policies: Policy[]) => void) => {
      fetchPolicies(params, callback);
    },
    500
  );

  useEffect(() => {
    let params: Partial<GetPoliciesParams> = {};
    if (!!search) {
      params.search = search.trim();
    }
    setLoading(true);
    debouncedFetchData(params, (policies: Policy[]) => {
      setPolicies(policies);
      setLoading(false);
    });
  }, [search]);

  return (
    <div className="flex flex-col" data-testid="table-element">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <SearchBar
            value={search}
            setSearchCallback={(val: string): void => setSearch(val)}
          />

          <div className="overflow-hidden rounded-lg shadow-sm">
            <table className="min-w-full">
              <thead className="border-b bg-gray-100">
                <tr>{renderHeaders()}</tr>
              </thead>
              <tbody>
                {loading ? (
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    Loading...
                  </td>
                ) : (
                  renderPolicies(policies)
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
