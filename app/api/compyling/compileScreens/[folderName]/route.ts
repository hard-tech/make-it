import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import path from 'path';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: { folderName: string } }
) => {
  const folderName = params.folderName;
  const scriptPath = "utils/script-py/compilling.py";
  const command = `python3 ${scriptPath} ${path.join(process.cwd(), 'public/uploads', folderName)}`;

  try {
    const { stdout, stderr } = await new Promise<{ stdout: string, stderr: string }>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else if (stderr) {
          reject(new Error(stderr));
        } else {
          resolve({ stdout, stderr });
        }
      });
    });

    console.log(`Script stdout: ${stdout.trim()}`);
    return NextResponse.json(
      { message: "File compiled successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing file." },
      { status: 500 }
    );
  }
};