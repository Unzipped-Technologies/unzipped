import { useSelector } from 'react-redux';

export const useRole = () => {
    const role = useSelector(state => state.Auth.user.role);

    switch (role) {
        case 0:
            return { name: 'FOUNDER', id: role };
        case 1:
            return { name: 'INVESTOR', id: role };
        case 2:
            return { name: 'ADMIN', id: role };
        default:
            return { name: 'UNKNOWN', id: null };
    }
};
