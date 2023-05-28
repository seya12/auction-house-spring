"use client";

import { ArticleDto } from "@/services/auction-house-service";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ArticleDto>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "hammerPrice",
    header: "Hammer Price",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Link
          className="text-blue-500 hover:text-blue-700"
          to={row.original.id + ""}>
          Open Detail Page
        </Link>
      );
    },
  },
];
