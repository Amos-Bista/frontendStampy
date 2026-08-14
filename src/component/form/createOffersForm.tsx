import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createOfferSchema = z.object({
    title: z.string().min(3, "Title is required"),
    businessId: z.string().min(1, "Business ID is required"),
    description: z.string().optional(),
    image: z.string().optional(),
    requiredStamps: z.coerce.number().min(1),
    expiryDate: z.string().optional(),
    isActive: z.boolean().optional(),
});

export default function CreateOffersForm({ onClose }: { onClose: () => void }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof createOfferSchema>>({
        resolver: zodResolver(createOfferSchema),
        defaultValues: {
            title: "Test",
            businessId: "6891b4d4f5f5d6c32cde1234",
            description: "test",
            image: "",
            requiredStamps: 1,
            // expiryDate: "",
            isActive: true,
        },
    });

    const onSubmit = async (data: z.infer<typeof createOfferSchema>) => {
        try {
            const res = await axios.post(`${API_URL}/api/v1/offers`, data);
            onClose();
            alert("Offer Created Successfully!");
            console.log(res.data);
            reset();
        } catch (err: unknown) {
            console.log(err);
            const message =
                axios.isAxiosError(err) && err.response?.data?.message
                    ? err.response.data.message
                    : "Something went wrong";
            alert(message);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 flex items-center justify-center p-1">
            <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden">
                <div className="bg-indigo-600 px-8 py-6">
                    <h1 className="text-3xl font-bold text-white">Create Offer</h1>
                    <p className="text-indigo-100 mt-1">
                        Test your Offer API with React Hook Form
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid md:grid-cols-2 gap-6 p-8"
                >
                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-medium">Offer Title</label>
                        <input
                            {...register("title")}
                            className={inputClass}
                            placeholder="Free Coffee"
                        />
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title?.message}
                        </p>
                    </div>

                    {/* Business ID */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-medium">Business ID</label>
                        <input
                            {...register("businessId")}
                            className={inputClass}
                            placeholder="6891b4d4f5f5d6c32cde1234"
                        />
                        <p className="text-red-500 text-sm mt-1">
                            {errors.businessId?.message}
                        </p>
                    </div>

                    {/* Required Stamps */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Required Stamps
                        </label>
                        <input
                            type="number"
                            {...register("requiredStamps", {
                                valueAsNumber: true,
                            })}
                            className={inputClass}
                        />
                        <p className="text-red-500 text-sm mt-1">
                            {errors.requiredStamps?.message}
                        </p>
                    </div>

                    {/* Expiry */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Expiry Date
                        </label>
                        <input
                            type="date"
                            {...register("expiryDate")}
                            className={inputClass}
                        />
                    </div>

                    {/* Image */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-medium">
                            Image URL
                        </label>
                        <input
                            {...register("image")}
                            className={inputClass}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-medium">
                            Description
                        </label>
                        <textarea
                            rows={5}
                            {...register("description")}
                            className={inputClass}
                            placeholder="Describe your offer..."
                        />
                    </div>

                    {/* Active */}
                    <div className="md:col-span-2 flex items-center gap-3">
                        <input
                            type="checkbox"
                            {...register("isActive")}
                            className="h-5 w-5 accent-indigo-600"
                        />
                        <span className="font-medium">Offer is Active</span>
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100 transition"
                        >
                            Reset
                        </button>

                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition"
                        >
                            {isSubmitting ? "Creating..." : "Create Offer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}