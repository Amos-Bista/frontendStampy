import { useForm } from 'react-hook-form';
import api from '../../api/api';

type BusinessFormData = {
    name: string;
    slug: string;
    description: string;
    // category: string;
    ownerName: string;
    email: string;
    phone: string;
    website: string;
    country: string;
    state: string;
    city: string;
    street: string;
    postalCode: string;
};

const BusinessSignupForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<BusinessFormData>();

    const onSubmit = async (data: BusinessFormData) => {
        try {
            const payload = {
                name: data.name,
                slug: data.slug,
                description: data.description,
                // category: data.category,
                ownerName: data.ownerName,
                email: data.email,
                phone: data.phone,
                website: data.website,
                address: {
                    country: data.country,
                    state: data.state,
                    city: data.city,
                    street: data.street,
                    postalCode: data.postalCode,
                },
            };

            const response = await api.post('/businesses', payload);

            console.log(response.data, "response from backend");

            alert('Business Created Successfully');

            reset();
        } catch (error: any) {
            console.error(error.response?.data || error);

            alert(
                'Something went wrong' + <br /> +
                error.response?.data?.message,
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                display: 'grid',
                gap: '12px',
                maxWidth: 500,
                margin: '50px auto',
            }}
        >
            <input placeholder="Business Name" {...register('name', { required: true })} />
            <input placeholder="Slug" {...register('slug', { required: true })} />
            <input placeholder="Description" {...register('description')} />
            {/* <input placeholder="Category" defaultValue="PET_SHOP" {...register('category')} /> */}
            <input placeholder="Owner Name" {...register('ownerName', { required: true })} />
            <input placeholder="Email" type="email" {...register('email', { required: true })} />
            <input placeholder="Phone" {...register('phone', { required: true })} />
            <input placeholder="Website" {...register('website')} />

            <hr />

            <input placeholder="Country" defaultValue="Nepal" {...register('country')} />
            <input placeholder="State" defaultValue="Koshi Province" {...register('state')} />
            <input placeholder="City" defaultValue="Barahachhetra" {...register('city')} />
            <input placeholder="Street" defaultValue="Nahada" {...register('street')} />
            <input placeholder="Postal Code" defaultValue="56700" {...register('postalCode')} />

            <button disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Create Business'}
            </button>

            {Object.keys(errors).length > 0 && (
                <p>Please fill all required fields.</p>
            )}
        </form>
    );
};

export default BusinessSignupForm;