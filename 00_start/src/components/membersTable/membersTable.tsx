import * as React from "react";
import { MemberEntity } from "../../model/member";
import { memberAPI } from "../../api/memberAPI";
import { MemberRow } from "./memberRow";
import { MemberHead } from "./memberHead";
import { trackPromise } from "react-promise-tracker";

interface Props {}

export const MembersTableComponent = (props: Props) => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [organizacion, setOrganizacion] = React.useState<string>("lemoncode");

  const loadMembers = () => {
    trackPromise(
      memberAPI
        .getAllMembers(organizacion)
        .then((members) => setMembers(members))
    );
  };

  return (
    <div className="row">
      <h2> Members Page</h2>
      <button onClick={loadMembers}>Load</button>
      <input
        defaultValue="lemoncode"
        onChange={(e) => setOrganizacion(e.target.value)}
      ></input>
      <table className="table">
        <thead>
          <MemberHead />
        </thead>
        <tbody>
          {members.map((member: MemberEntity) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
