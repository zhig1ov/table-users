export async function getUsers(url,fn, searchVal, key) {
    try {
        // получаем объект ответа
        const response = await fetch(searchVal ? `${url}${searchVal}` : `${url}`);
        // из объекта ответа извлекаем json
        const user = await response.json();
        // делаем массив объектов с нужными данными
        const usersData = [];
        user.users.map((user) => {
            const userData = {
                fullName: `${user.firstName} ${user.maidenName} ${user.lastName}`,
                firstName: user.firstName,
                lastName: user.lastName,
                maidenName: user.maidenName,
                age: user.age,
                gender: user.gender,
                phone: user.phone,
                city: user.address.city,
                address: user.address.address,
                fullAddress: `${user.address.city}, ${user.address.address}`,
                email: user.email,
                height: user.height,
                weight: user.weight,
            }
            usersData.push(userData);
        })
        fn(usersData);
    } catch (err) {
        alert(`Произошел сбой при загрузке списка пользователей - ${err.message}` );
        console.log(err.message);
    }
}
