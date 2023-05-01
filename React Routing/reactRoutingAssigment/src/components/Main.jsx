import { Route, Routes} from 'react-router-dom';
import Home from './Home';
import FourOhFour from './FourOhFour';
import UsersDetails from './UsersDetails';
import UsersList from './UsersList';
import AddressesDetails from './AddressesDetails';
import AddressesList from './AddressesList';


export default function Main(){

    return (
        <main>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/home' element={<Home></Home>}></Route>
            <Route path='/index' element={<Home></Home>}></Route>
            <Route path='/index.html' element={<Home></Home>}></Route>
            <Route path='/users/*' element={<UsersList></UsersList>}>
                <Route path=':uid' element={<UsersDetails></UsersDetails>}></Route>
            </Route>
            <Route path='/addresses/*' element={<AddressesList></AddressesList>}>
                <Route path=':uid' element={<AddressesDetails></AddressesDetails>}></Route>
            </Route>
            <Route path='*' element={<FourOhFour></FourOhFour>}></Route>
        </Routes>
       
    
    </main>
    )
}