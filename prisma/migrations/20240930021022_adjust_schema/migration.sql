-- CreateTable
CREATE TABLE "InsurancePolicy" (
    "insurance_policy_id" VARCHAR(10) NOT NULL,
    "insurance_policy_name" VARCHAR(255) NOT NULL,
    "base_price_sgd" DECIMAL(10,2) NOT NULL,
    "type_of_policy" VARCHAR(50) NOT NULL,
    "policy_holder_id" VARCHAR(10) NOT NULL,
    "policy_holder_email" VARCHAR(255) NOT NULL,
    "policy_holder_first_name" VARCHAR(50) NOT NULL,
    "policy_holder_last_name" VARCHAR(50) NOT NULL,
    "policy_ids" TEXT,

    CONSTRAINT "InsurancePolicy_pkey" PRIMARY KEY ("insurance_policy_id")
);
