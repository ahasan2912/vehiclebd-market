
export interface TeamMembers {
    image: string;
    name: string;
    title: string;
    social: {
        facebook: string;
        twitter: string;
        linkedin: string;
        instagram: string;
    };
}

export const teamMembers: TeamMembers[] = [
    {
        image: '/assets/images/team/1.jpg',
        name: 'John Doe',
        title: 'Engine Expert',
        social: {
            facebook: 'https://facebook.com/johndoe',
            twitter: 'https://twitter.com/johndoe',
            linkedin: 'https://linkedin.com/in/johndoe',
            instagram: 'https://instagram.com/johndoe',
        },
    },
    {
        image: '/assets/images/team/2.jpg',
        name: 'Jane Smith',
        title: 'Diagnostic Specialist',
        social: {
            facebook: 'https://facebook.com/janesmith',
            twitter: 'https://twitter.com/janesmith',
            linkedin: 'https://linkedin.com/in/janesmith',
            instagram: 'https://instagram.com/janesmith',
        },
    },
    {
        image: '/assets/images/team/3.jpg',
        name: 'Mike Johnson',
        title: 'Auto Body Expert',
        social: {
            facebook: 'https://facebook.com/mikejohnson',
            twitter: 'https://twitter.com/mikejohnson',
            linkedin: 'https://linkedin.com/in/mikejohnson',
            instagram: 'https://instagram.com/mikejohnson',
        },
    },
    {
        image: '/assets/images/team/1.jpg',
        name: 'Emily White',
        title: 'Electrical System Pro',
        social: {
            facebook: 'https://facebook.com/emilywhite',
            twitter: 'https://twitter.com/emilywhite',
            linkedin: 'https://linkedin.com/in/emilywhite',
            instagram: 'https://instagram.com/emilywhite',
        },
    },
    {
        image: '/assets/images/team/2.jpg',
        name: 'David Brown',
        title: 'Suspension Expert',
        social: {
            facebook: 'https://facebook.com/davidbrown',
            twitter: 'https://twitter.com/davidbrown',
            linkedin: 'https://linkedin.com/in/davidbrown',
            instagram: 'https://instagram.com/davidbrown',
        },
    },
];