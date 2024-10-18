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

interface Customer {
  id: string;
  nric: string;
  email: string;
  firstName: string;
  lastName: string;
  policies: {
    id: string;
    name: string;
  }[];
}

const PolicyHolders = async () => {
  const customers: Customer[] = await prisma.customer.findMany({
    include: {
      policies: true,
    },
  });

  const totalPolicies = customers.reduce(
    (acc, customer) => acc + customer.policies.length,
    0
  );

  return (
    <div className="flex mx-10">
      <div className="flex min-h-screen bg-gray-100 text-black">
        <Sidebar />
        <div className="flex-1 p-4"></div>
      </div>
      <div className="flex-row space-y-6">
        <Link href="/customers/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Policy Holder
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">Policy Holders</h1>
          <p className="text-gray-600">
            Personal details of all policy holders
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NRIC</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Policies Held</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.nric}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.firstName}</TableCell>
                <TableCell>{customer.lastName}</TableCell>
                <TableCell>
                  {customer.policies.map((policy) => (
                    <span key={policy.id}>{policy.name}</span>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total Policies</TableCell>
              <TableCell className="text-right">{totalPolicies}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default PolicyHolders;
