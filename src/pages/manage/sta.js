import Universal from "./universal";

export default function STA({token, setToken,  perms}){
    return <Universal token={token} setToken={setToken} perms={perms} needed='sx' />
}