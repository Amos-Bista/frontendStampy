import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FEATURE_OPTIONS = [
    "Digital Loyalty Card",
    "QR Rewards",
    "Customer Management",
    "Analytics",
    "Advanced Analytics",
    "Staff Management",
    "Custom Branding",
    "Reports",
];

const subscriptionPlanSchema = z.object({
    name: z
        .string()
        .min(2, "Plan name must be at least 2 characters")
        .max(50, "Plan name cannot exceed 50 characters"),

    description: z
        .string()
        .min(5, "Description must be at least 5 characters")
        .max(250, "Description cannot exceed 250 characters"),

    monthlyPrice: z.coerce
        .number()
        .min(0, "Monthly price cannot be negative"),

    yearlyPrice: z.coerce
        .number()
        .min(0, "Yearly price cannot be negative"),

    customers: z.coerce
        .number()
        .int("Customers must be a whole number")
        .min(1, "Customers must be at least 1"),

    offers: z.coerce
        .number()
        .int("Offers must be a whole number")
        .min(1, "Offers must be at least 1"),

    staff: z.coerce
        .number()
        .int("Staff must be a whole number")
        .min(1, "Staff must be at least 1"),

    features: z.array(z.string()).min(1, "Select at least one feature"),

    isActive: z.boolean(),

    isPublic: z.boolean(),
});

type SubscriptionPlanFormValues = z.infer<
    typeof subscriptionPlanSchema
>;

interface CreateSubscriptionPlanFormProps {
    onSubmitPlan?: (data: SubscriptionPlanFormValues) => void;
    isLoading?: boolean;
}

const CreateSubscriptionPlanForm = ({
    onSubmitPlan,
    isLoading = false,
}: CreateSubscriptionPlanFormProps) => {
    const [showFeatures, setShowFeatures] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<SubscriptionPlanFormValues>({
        resolver: zodResolver(subscriptionPlanSchema),
        defaultValues: {
            name: "",
            description: "",
            monthlyPrice: 0,
            yearlyPrice: 0,
            customers: 100,
            offers: 10,
            staff: 1,
            features: [
                "Digital Loyalty Card",
                "QR Rewards",
                "Customer Management",
            ],
            isActive: true,
            isPublic: true,
        },
    });

    const selectedFeatures = watch("features");

    const handleFeatureChange = (
        feature: string,
        checked: boolean
    ) => {
        const currentFeatures = selectedFeatures || [];

        if (checked) {
            setValue(
                "features",
                [...currentFeatures, feature],
                { shouldValidate: true }
            );
        } else {
            setValue(
                "features",
                currentFeatures.filter((item) => item !== feature),
                { shouldValidate: true }
            );
        }
    };

    const submitHandler = (
        data: SubscriptionPlanFormValues
    ) => {
        onSubmitPlan?.(data);
    };

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-full max-w-4xl"
        >
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

                {/* Header */}
                <div className="border-b border-gray-200 px-6 py-5">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Create Subscription Plan
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Create a pricing plan that businesses can subscribe to.
                    </p>
                </div>

                {/* Form Body */}
                <div className="space-y-8 p-6">

                    {/* Basic Information */}
                    <section>
                        <h3 className="mb-4 text-base font-semibold text-gray-900">
                            Basic Information
                        </h3>

                        <div className="grid grid-cols-1 gap-5">

                            {/* Plan Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Plan Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Growth"
                                    {...register("name")}
                                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`}
                                />

                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    rows={3}
                                    placeholder="For growing businesses"
                                    {...register("description")}
                                    className={`w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.description
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`}
                                />

                                {errors.description && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section>
                        <h3 className="mb-4 text-base font-semibold text-gray-900">
                            Pricing
                        </h3>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Monthly */}
                            <div>
                                <label
                                    htmlFor="monthlyPrice"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Monthly Price
                                </label>

                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                        Rs.
                                    </span>

                                    <input
                                        id="monthlyPrice"
                                        type="number"
                                        min="0"
                                        {...register("monthlyPrice")}
                                        className={`w-full rounded-lg border py-2.5 pl-12 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${errors.monthlyPrice
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />
                                </div>

                                {errors.monthlyPrice && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.monthlyPrice.message}
                                    </p>
                                )}
                            </div>

                            {/* Yearly */}
                            <div>
                                <label
                                    htmlFor="yearlyPrice"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Yearly Price
                                </label>

                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                        Rs.
                                    </span>

                                    <input
                                        id="yearlyPrice"
                                        type="number"
                                        min="0"
                                        {...register("yearlyPrice")}
                                        className={`w-full rounded-lg border py-2.5 pl-12 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${errors.yearlyPrice
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />
                                </div>

                                {errors.yearlyPrice && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.yearlyPrice.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Limits */}
                    <section>
                        <h3 className="mb-4 text-base font-semibold text-gray-900">
                            Plan Limits
                        </h3>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                            {/* Customers */}
                            <div>
                                <label
                                    htmlFor="customers"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Customers
                                </label>

                                <input
                                    id="customers"
                                    type="number"
                                    min="1"
                                    {...register("customers")}
                                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${errors.customers
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`}
                                />

                                {errors.customers && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.customers.message}
                                    </p>
                                )}
                            </div>

                            {/* Offers */}
                            <div>
                                <label
                                    htmlFor="offers"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Offers
                                </label>

                                <input
                                    id="offers"
                                    type="number"
                                    min="1"
                                    {...register("offers")}
                                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${errors.offers
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`}
                                />

                                {errors.offers && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.offers.message}
                                    </p>
                                )}
                            </div>

                            {/* Staff */}
                            <div>
                                <label
                                    htmlFor="staff"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Staff
                                </label>

                                <input
                                    id="staff"
                                    type="number"
                                    min="1"
                                    {...register("staff")}
                                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${errors.staff
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`}
                                />

                                {errors.staff && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.staff.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section>
                        <button
                            type="button"
                            onClick={() => setShowFeatures(!showFeatures)}
                            className="mb-4 flex w-full items-center justify-between text-left"
                        >
                            <h3 className="text-base font-semibold text-gray-900">
                                Features
                            </h3>

                            <span className="text-sm text-gray-500">
                                {showFeatures ? "Hide" : "Show"}
                            </span>
                        </button>

                        {showFeatures && (
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {FEATURE_OPTIONS.map((feature) => {
                                    const checked =
                                        selectedFeatures?.includes(feature);

                                    return (
                                        <label
                                            key={feature}
                                            className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={(e) =>
                                                    handleFeatureChange(
                                                        feature,
                                                        e.target.checked
                                                    )
                                                }
                                                className="h-4 w-4 rounded"
                                            />

                                            <span className="text-sm text-gray-700">
                                                {feature}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        )}

                        {errors.features && (
                            <p className="mt-2 text-xs text-red-500">
                                {errors.features.message}
                            </p>
                        )}
                    </section>

                    {/* Settings */}
                    <section>
                        <h3 className="mb-4 text-base font-semibold text-gray-900">
                            Settings
                        </h3>

                        <div className="space-y-4">

                            {/* Active */}
                            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        Active
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Businesses can subscribe to this plan.
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    {...register("isActive")}
                                    className="h-5 w-5 rounded"
                                />
                            </label>

                            {/* Public */}
                            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        Visible to Businesses
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Show this plan on the business pricing page.
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    {...register("isPublic")}
                                    className="h-5 w-5 rounded"
                                />
                            </label>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">

                    <button
                        type="button"
                        className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "Creating..." : "Create Plan"}
                    </button>

                </div>
            </div>
        </form>
    );
};

export default CreateSubscriptionPlanForm;