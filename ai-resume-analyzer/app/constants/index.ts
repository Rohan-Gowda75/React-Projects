export interface Resume {
    id: string;
    companyName?: string;
    jobTitle?: string;
    imagePath: string;
    resumePath: string;
    feedback: {
        overallScore: number;
        ATS: { score: number; tips: any[] };
        toneAndStyle: { score: number; tips: any[] };
        content: { score: number; tips: any[] };
        structure: { score: number; tips: any[] };
        skills: { score: number; tips: any[] };
    };
}

export const resumes: Resume[] = [
    // First three resumes (old 123)
    {
        id: "1",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: { score: 90, tips: [] },
            toneAndStyle: { score: 90, tips: [] },
            content: { score: 90, tips: [] },
            structure: { score: 90, tips: [] },
            skills: { score: 90, tips: [] },
        },
    },
    {
        id: "2",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: { score: 90, tips: [] },
            toneAndStyle: { score: 90, tips: [] },
            content: { score: 90, tips: [] },
            structure: { score: 90, tips: [] },
            skills: { score: 90, tips: [] },
        },
    },
    {
        id: "3",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: { score: 90, tips: [] },
            toneAndStyle: { score: 90, tips: [] },
            content: { score: 90, tips: [] },
            structure: { score: 90, tips: [] },
            skills: { score: 90, tips: [] },
        },
    },

    // Next three resumes (new 456)
    {
        id: "4",
        companyName: "Amazon",
        jobTitle: "Backend Developer",
        imagePath: "/images/resume_04.png",
        resumePath: "/resumes/resume-4.pdf",
        feedback: {
            overallScore: 80,
            ATS: { score: 85, tips: [] },
            toneAndStyle: { score: 80, tips: [] },
            content: { score: 82, tips: [] },
            structure: { score: 78, tips: [] },
            skills: { score: 88, tips: [] },
        },
    },
    {
        id: "5",
        companyName: "Facebook",
        jobTitle: "Fullstack Developer",
        imagePath: "/images/resume_05.png",
        resumePath: "/resumes/resume-5.pdf",
        feedback: {
            overallScore: 90,
            ATS: { score: 92, tips: [] },
            toneAndStyle: { score: 88, tips: [] },
            content: { score: 85, tips: [] },
            structure: { score: 90, tips: [] },
            skills: { score: 95, tips: [] },
        },
    },
    {
        id: "6",
        companyName: "Netflix",
        jobTitle: "DevOps Engineer",
        imagePath: "/images/resume_06.png",
        resumePath: "/resumes/resume-6.pdf",
        feedback: {
            overallScore: 78,
            ATS: { score: 80, tips: [] },
            toneAndStyle: { score: 75, tips: [] },
            content: { score: 78, tips: [] },
            structure: { score: 82, tips: [] },
            skills: { score: 85, tips: [] },
        },
    },
];

export const AIResponseFormat = `
interface Feedback {
    overallScore: number; // max 100
    ATS: {
        score: number;
        tips: { type: "good" | "improve"; tip: string }[];
    };
    toneAndStyle: {
        score: number;
        tips: { type: "good" | "improve"; tip: string; explanation: string }[];
    };
    content: {
        score: number;
        tips: { type: "good" | "improve"; tip: string; explanation: string }[];
    };
    structure: {
        score: number;
        tips: { type: "good" | "improve"; tip: string; explanation: string }[];
    };
    skills: {
        score: number;
        tips: { type: "good" | "improve"; tip: string; explanation: string }[];
    };
}`;

export const prepareInstructions = ({
                                        jobTitle,
                                        jobDescription,
                                    }: {
    jobTitle: string;
    jobDescription: string;
}) => `
You are an expert in ATS (Applicant Tracking System) and resume analysis.
Please analyze and rate this resume and suggest how to improve it.
The rating can be low if the resume is bad.
Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
If available, use the job description for the job user is applying to to give more detailed feedback.
If provided, take the job description into consideration.
The job title is: ${jobTitle}
The job description is: ${jobDescription}
Provide the feedback using the following format:
${AIResponseFormat}
Return the analysis as a JSON object, without any other text and without the backticks.
Do not include any other text or comments.
`;
