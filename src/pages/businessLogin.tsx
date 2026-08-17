
import React, { useState } from 'react';
import {
    Building2,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Loader2,
    AlertCircle,
    Eye,
    EyeOff,
    Lock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL =
    import.meta.env.VITE_API_URL || 'http://192.168.254.14:5000';

export default function BusinessAuthWithAPI() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [step, setStep] = useState(1);

    // API State
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [registeredBusiness, setRegisteredBusiness] = useState<any | null>(
        null
    );

    // Form State
    const [formData, setFormData] = useState({
        ownerName: 'Amos',
        email: 'test@gmail.com',
        phone: '1234567890',
        password: 'amos@9849',

        name: 'Guinea Pig Nepal',
        category: 'CAFE',
        website: '',

        address: {
            country: 'Nepal',
            state: 'bagmanti',
            city: 'kathmandu',
            street: 'Greenland Street',
            postalCode: '44600',
        },
    });

    // -------------------------------------------------------------
    // INPUT HANDLERS
    // -------------------------------------------------------------

    const handleBusinessNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const name = e.target.value;

        const generatedSlug = name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        setFormData((prev) => ({
            ...prev,
            name,
            slug: generatedSlug,
        }));
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddressChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value,
            },
        }));
    };

    // -------------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------------

    const validateStep = (currentStep: number): boolean => {
        setApiError(null);

        if (currentStep === 1) {
            if (!formData.ownerName.trim()) {
                setApiError('Owner name is required.');
                return false;
            }

            if (!formData.email.trim()) {
                setApiError('Email is required.');
                return false;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                setApiError('Please enter a valid email address.');
                return false;
            }

            if (!formData.phone.trim()) {
                setApiError('Phone number is required.');
                return false;
            }

            return true;
        }

        if (currentStep === 2) {
            if (!formData.name.trim()) {
                setApiError('Business name is required.');
                return false;
            }

            if (!formData.category) {
                setApiError('Business category is required.');
                return false;
            }

            if (formData.website.trim()) {
                try {
                    new URL(formData.website);
                } catch {
                    setApiError(
                        'Please enter a valid website URL, e.g. https://example.com'
                    );
                    return false;
                }
            }

            return true;
        }

        if (currentStep === 3) {
            if (!formData.address.country.trim()) {
                setApiError('Country is required.');
                return false;
            }

            if (!formData.address.state.trim()) {
                setApiError('State is required.');
                return false;
            }

            if (!formData.address.city.trim()) {
                setApiError('City is required.');
                return false;
            }

            return true;
        }

        return true;
    };

    // -------------------------------------------------------------
    // NEXT STEP
    // IMPORTANT:
    // This NEVER calls the API.
    // -------------------------------------------------------------

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!validateStep(step)) {
            return;
        }

        setStep((prev) => Math.min(prev + 1, 3));
    };

    // -------------------------------------------------------------
    // PREVIOUS STEP
    // -------------------------------------------------------------

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setApiError(null);

        setStep((prev) => Math.max(prev - 1, 1));
    };

    // -------------------------------------------------------------
    // API POST SUBMISSION
    //
    // THIS IS THE ONLY PLACE WHERE THE REGISTRATION API IS CALLED.
    // -------------------------------------------------------------

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Safety guard:
        // Never allow this API call unless we are actually on Step 3.
        if (step !== 3) {
            return;
        }

        // Validate Step 3 before API call
        if (!validateStep(3)) {
            return;
        }

        if (isLoading) {
            return;
        }

        setIsLoading(true);
        setApiError(null);

        try {
            const response = await fetch(
                `${API_URL}/api/v1/businesses`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            let result: any;

            try {
                result = await response.json();
            } catch {
                throw new Error(
                    `Server returned an invalid response(${response.status}).`
                );
            }

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || 'Business registration failed.'
                );
            }

            // ---------------------------------------------------------
            // API SUCCESS
            // ---------------------------------------------------------

            const { token, data } = result;

            console.log(
                'Business registration successful:',
                data?.business
            );

            // Save Token
            if (token) {
                localStorage.setItem('authToken', token);
            }

            // Save Business ID
            if (data?.business?._id) {
                localStorage.setItem(
                    'businessId',
                    data.business._id
                );
            }

            // Save full business object
            if (data) {
                localStorage.setItem(
                    'businessUser',
                    JSON.stringify(data)
                );
            }

            // Show success screen
            if (data?.business) {
                setRegisteredBusiness(data.business);
            } else {
                setRegisteredBusiness(formData);
            }


            navigate(`/dashboard/${data?.business?._id}`, { replace: true });
        } catch (err: any) {
            console.error('Business registration error:', err);

            setApiError(
                err?.message ||
                'Something went wrong while registering the business.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    // -------------------------------------------------------------
    // SUCCESS SCREEN
    // -------------------------------------------------------------

    if (registeredBusiness) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl text-center space-y-6">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Welcome, {registeredBusiness.ownerName}!
                        </h2>

                        <p className="text-sm text-slate-500">
                            <span className="font-semibold text-slate-700">
                                {registeredBusiness.name}
                            </span>{' '}
                            has been registered successfully.
                        </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs font-mono text-slate-600 space-y-1">
                        <p>
                            <span className="text-slate-400">ID:</span>{' '}
                            {registeredBusiness._id || 'N/A'}
                        </p>

                        <p>
                            <span className="text-slate-400">
                                Slug:
                            </span>{' '}
                            {registeredBusiness.slug || 'N/A'}
                        </p>

                        <p>
                            <span className="text-slate-400">
                                Status:
                            </span>{' '}
                            {registeredBusiness.status || 'ACTIVE'}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setRegisteredBusiness(null);
                            setStep(1);
                            setApiError(null);
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl text-sm transition"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }



    const handleBusinessLogin = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        // console.log('Business login attempt:', formData);
        if (isLoading) return;

        setIsLoading(true);
        setApiError(null);

        try {
            const response = await fetch(
                `${API_URL}/api/v1/auth/business/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        identifier: formData.email,
                        password: formData.password,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    "Invalid email or password"
                );
            }

            const business =
                result.data?.business;

            if (!business?._id) {
                throw new Error(
                    "Invalid server response"
                );
            }

            // Save authentication
            localStorage.setItem(
                "authToken",
                result.token
            );

            localStorage.setItem(
                "businessId",
                business._id
            );

            localStorage.setItem(
                "businessUser",
                JSON.stringify(business)
            );

            // Go to dashboard
            navigate(
                `/dashboard/${business._id}`,
                {
                    replace: true,
                }
            );

        } catch (error: any) {

            console.error(
                "Business login error:",
                error
            );

            setApiError(
                error.message ||
                "Unable to login"
            );

        } finally {
            setIsLoading(false);
        }
    };
    // -------------------------------------------------------------
    // MAIN FORM
    // -------------------------------------------------------------

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-0 sm:p-4 lg:p-8">
            <div className="w-full max-w-5xl bg-white min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

                {/* LEFT BRANDING PANEL */}
                <div className="lg:col-span-5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between lg:block">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>

                            <span className="text-xl font-bold tracking-tight">
                                StampHub
                            </span>
                        </div>
                    </div>

                    <div className="hidden lg:block relative z-10 my-auto space-y-4 pt-8">
                        <h2 className="text-3xl font-extrabold leading-tight">
                            {isLogin
                                ? 'Welcome back.'
                                : 'Scale your customer rewards.'}
                        </h2>

                        <p className="text-indigo-100 text-sm">
                            Connect your business details to your
                            automated loyalty engine.
                        </p>
                    </div>

                    <div className="hidden lg:block relative z-10 text-xs text-indigo-200 pt-8">
                        © {new Date().getFullYear()} StampHub API Client
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
                    <div>

                        {/* MODE SWITCHER */}
                        <div className="bg-slate-100 p-1 rounded-xl flex items-center mb-6">
                            <button
                                type="button"
                                onClick={() => { setIsLogin(false); setStep(1); setApiError(null); }}
                                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition ${!isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                                    }`}
                            >
                                Register Business
                            </button>
                            <button
                                type="button"
                                onClick={() => { setIsLogin(true); setStep(1); setApiError(null); }}
                                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition ${isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                                    }`}
                            >
                                Sign In
                            </button>
                        </div>

                        {/* ERROR MESSAGE */}
                        {apiError && (
                            <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs flex items-center space-x-3">
                                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />

                                <span>{apiError}</span>
                            </div>
                        )}

                        {/* STEP PROGRESS */}
                        {!isLogin && (
                            <div className="mb-6">
                                <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
                                    <span>
                                        Step {step} of 3
                                    </span>

                                    <span className="text-indigo-600 font-semibold">
                                        {step === 1 &&
                                            'Owner Account'}

                                        {step === 2 &&
                                            'Business Profile'}

                                        {step === 3 &&
                                            'Location Address'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    {[1, 2, 3].map((s) => (
                                        <div
                                            key={s}
                                            className={`h - 1.5 rounded - full transition - all duration - 300 ${s <= step
                                                ? 'bg-indigo-600'
                                                : 'bg-slate-100'
                                                } `}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* =================================================
                            IMPORTANT:
                            The form exists for both login and registration.
                            Continue buttons are type="button".
                            ONLY Step 3 Register Business is type="submit".
                        ================================================== */}

                        <form
                            onSubmit={isLogin ? handleBusinessLogin : handleSubmit}
                            className="space-y-4"
                            noValidate
                        >

                            {/* LOGIN */}
                            {isLogin && (
                                <div className="space-y-4">

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Email or Phone
                                        </label>

                                        <input
                                            type="text"
                                            required
                                            value={formData.email}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'email',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'password',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        // onClick={() => handleBusinessLogin}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl text-sm transition disabled:opacity-50"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            )}

                            {/* =================================================
                                STEP 1
                            ================================================== */}
                            {!isLogin && step === 1 && (
                                <div className="space-y-4">

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Owner Name *
                                        </label>

                                        <input
                                            type="text"
                                            required
                                            placeholder="Jane Doe"
                                            value={formData.ownerName}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'ownerName',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                Email *
                                            </label>

                                            <input
                                                type="email"
                                                required
                                                placeholder="jane@business.com"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'email',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                Phone *
                                            </label>

                                            <input
                                                type="tel"
                                                required
                                                placeholder="+1 (555) 000-0000"
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'phone',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                Password *
                                            </label>

                                            <div className="relative">
                                                <Lock
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                                    size={18}
                                                />

                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    required
                                                    minLength={8}
                                                    placeholder="Create a password"
                                                    value={formData.password}
                                                    onChange={(e) =>
                                                        handleInputChange('password', e.target.value)
                                                    }
                                                    className="w-full pl-11 pr-12 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-700 transition"
                                                    aria-label={
                                                        showPassword
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <EyeOff size={18} />
                                                    ) : (
                                                        <Eye size={18} />
                                                    )}
                                                </button>
                                            </div>

                                            <p className="mt-1 text-[11px] text-slate-400">
                                                Password must be at least 8 characters.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* =================================================
                                STEP 2
                            ================================================== */}
                            {!isLogin && step === 2 && (
                                <div className="space-y-4">

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Business Name *
                                        </label>

                                        <input
                                            type="text"
                                            required
                                            placeholder="Artisan Bakery Co"
                                            value={formData.name}
                                            onChange={
                                                handleBusinessNameChange
                                            }
                                            className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                Category *
                                            </label>

                                            <select
                                                required
                                                value={formData.category}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'category',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                                            >
                                                <option value="">
                                                    Select Category
                                                </option>

                                                <option value="CAFE">
                                                    Cafe
                                                </option>

                                                <option value="RESTAURANT">
                                                    Restaurant
                                                </option>

                                                <option value="RETAIL">
                                                    Retail
                                                </option>

                                                <option value="SERVICES">
                                                    Services
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                Website
                                            </label>

                                            <input
                                                type="url"
                                                placeholder="https://artisan.com"
                                                value={formData.website}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'website',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* =================================================
                                STEP 3
                            ================================================== */}
                            {!isLogin && step === 3 && (
                                <div className="space-y-4">

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                Country *
                                            </label>

                                            <input
                                                type="text"
                                                required
                                                placeholder="United States"
                                                value={
                                                    formData.address
                                                        .country
                                                }
                                                onChange={(e) =>
                                                    handleAddressChange(
                                                        'country',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                State *
                                            </label>

                                            <input
                                                type="text"
                                                required
                                                placeholder="California"
                                                value={
                                                    formData.address
                                                        .state
                                                }
                                                onChange={(e) =>
                                                    handleAddressChange(
                                                        'state',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                City *
                                            </label>

                                            <input
                                                type="text"
                                                required
                                                placeholder="San Francisco"
                                                value={
                                                    formData.address
                                                        .city
                                                }
                                                onChange={(e) =>
                                                    handleAddressChange(
                                                        'city',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                Postal Code
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="94105"
                                                value={
                                                    formData.address
                                                        .postalCode
                                                }
                                                onChange={(e) =>
                                                    handleAddressChange(
                                                        'postalCode',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* =================================================
                                NAVIGATION
                            ================================================== */}

                            {!isLogin && (
                                <div className="flex items-center justify-between pt-6">

                                    {/* BACK */}
                                    {step > 1 ? (
                                        <button
                                            type="button"
                                            disabled={isLoading}
                                            onClick={handleBack}
                                            className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition disabled:opacity-50"
                                        >
                                            <ArrowLeft className="w-4 h-4" />

                                            <span>
                                                Back
                                            </span>
                                        </button>
                                    ) : (
                                        <div />
                                    )}

                                    {/* CONTINUE */}
                                    {step < 3 ? (
                                        <button
                                            type="button"
                                            disabled={isLoading}
                                            onClick={handleNext}
                                            className="ml-auto flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-md shadow-indigo-200 disabled:opacity-50"
                                        >
                                            <span>
                                                Continue
                                            </span>

                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    ) : (

                                        /* =================================================
                                           ONLY THIS BUTTON CAN SUBMIT THE FORM
                                        ================================================== */

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="ml-auto flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-md shadow-emerald-200 disabled:opacity-50"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />

                                                    <span>
                                                        Creating Business...
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 className="w-4 h-4" />

                                                    <span>
                                                        Register Business
                                                    </span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

