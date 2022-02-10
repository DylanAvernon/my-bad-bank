import { UserContext } from "../context/context";
import { useContext } from 'react';
function AllData(){
  const ctx = useContext(UserContext);
  return (
    <>
    <h4>All Data in Store</h4>
    <h5 className='mt-3'>Logged In: {ctx.user ? ctx.user.name : 'No User Logged In'}</h5>
    <h5 className='mt-3'>Users:</h5>
    <div className='container d-flex justify-content-center'>
      <table className='table table-hover table-dark table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {ctx.users.map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  {user.name}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.password}
                </td>
                <td>
                  {user.balance}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}
export default AllData;
