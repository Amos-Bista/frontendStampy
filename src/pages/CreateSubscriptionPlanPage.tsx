import CreateSubscriptionPlanForm from "../component/form/CreateSubscriptionPlanForm";

const CreateSubscriptionPlanPage = () => {
    const handleCreatePlan = (data: any) => {
        console.log("Create subscription plan:", data);

        // Later:
        // createSubscriptionPlan(data)
    };

    return (
        <div className="min-h-full bg-gray-50 p-6">
            <CreateSubscriptionPlanForm
                onSubmitPlan={handleCreatePlan}
            />
        </div>
    );
};

export default CreateSubscriptionPlanPage;