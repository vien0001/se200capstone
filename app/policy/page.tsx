import Sidebar from "../../components/Sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

interface Policy {
  id: string;
  policyNumber: string;
  name: string;
  basePrice: number;
  typeOfPolicy: string;
}

const Home = async () => {
  const policies: Policy[] = await prisma.policy.findMany({
    select: {
      policyNumber: true,
      name: true,
      basePrice: true,
      typeOfPolicy: true,
    },
  });

  const totalPrice = policies.reduce(
    (acc, policy) => acc + Number(policy.basePrice),
    0
  );

  return (
    <div className="flex mx-10">
      <div className="flex min-h-screen bg-gray-100 text-black">
        <Sidebar />
        <div className="flex-1 p-4"></div>
      </div>
      <div className="flex-row  space-y-6">
        <Link href="/policy/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Policy
          </Button>
        </Link>

        <div>
          <h1 className="text-xl font-bold">Insurance Policies</h1>
          <p className="text-gray-600">
            Critical details of Insurance policies
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type of Policy</TableHead>
              <TableHead className="text-right">Base Price (SGD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy.policyNumber}>
                <TableCell>{policy.policyNumber}</TableCell>
                <TableCell>{policy.name}</TableCell>
                <TableCell>{policy.typeOfPolicy}</TableCell>
                <TableCell className="text-right">
                  ${Number(policy.basePrice).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                ${totalPrice.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Home;
