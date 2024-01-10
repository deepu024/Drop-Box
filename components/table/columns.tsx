"use client"

import { FileType } from "@/typings"
import { ColumnDef } from "@tanstack/react-table"
import prettyBytes from 'pretty-bytes';
import { FileIcon, defaultStyles } from 'react-file-icon';

export const columns: ColumnDef<FileType>[] = [
    {
        accessorKey: "fileType",
        header: "Type",
        cell: ({ renderValue, ...props }) => {
            const type = renderValue() as string
            const extension: string = type.split("/")[1];
            // @ts-ignore
            return (
                <div className="w-10">
                    <FileIcon
                        extension={extension}
                        // @ts-ignore
                        {...defaultStyles[extension]}
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "fileName",
        header: "FileName",
    },
    {
        accessorKey: "addedDate",
        header: "Date Added",
    },
    {
        accessorKey: "fileSize",
        header: "Size",
        cell: ({ renderValue, ...props }) => {
            return <span>{prettyBytes(renderValue() as number)}</span>
        }
    },
    {
        accessorKey: "downloadUrl",
        header: "Link",
        cell: ({ renderValue, ...props }) => {
            return <a
                href={renderValue() as string}
                target="_blank"
                className="underline text-blue-500 hover:text-blue-600"
            >
                Download
            </a>
        }
    }
]
