import Universal from "./universal";

export default function Judge({token, setToken, perms}){

    return <Universal token={token} setToken={setToken} perms={perms} needed='jx'/>
}