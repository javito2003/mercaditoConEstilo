export default function ({ redirect }) {
    const user = JSON.parse(localStorage.getItem('auth'))
    const admin = user.userData.rol
    if (admin === 'ADMIN') {
        alert('Going to create the product...')
    }if (admin === 'USER') {
        alert('Denied access')
        redirect('/profile')
            
        }
    }