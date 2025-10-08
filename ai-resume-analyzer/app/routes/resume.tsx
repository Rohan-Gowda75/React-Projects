import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => ([
    { title: 'hired.IN | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
]);

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate(`/auth?next=/resume/${id}`);
        }
    }, [isLoading]);


    useEffect(() => {
        const loadResume = async () => {
            try {
                const resume = await kv.get(`resume:${id}`);

                if (!resume) {
                    console.warn("⚠️ No resume found in kv, using fallback data");
                    setFeedback({
                        summary: "No resume data found. Showing sample feedback.",
                        ATS: { score: 60, tips: ["Add more keywords", "Improve formatting"] },
                        details: ["This is fallback feedback for demo purposes."]
                    });
                    return;
                }

                const data = JSON.parse(resume);


                // load PDF
                if (data.resumePath) {
                    const resumeBlob = await fs.read(data.resumePath);
                    if (resumeBlob) {
                        const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
                        setResumeUrl(URL.createObjectURL(pdfBlob));
                    }
                }

                // load image
                if (data.imagePath) {
                    const imageBlob = await fs.read(data.imagePath);
                    if (imageBlob) {
                        setImageUrl(URL.createObjectURL(imageBlob));
                    }
                }


                setFeedback(data.feedback ?? {
                    summary: "No feedback available.",
                    ATS: { score: 0, tips: [] },
                    details: []
                });

            } catch (err) {
                console.error("❌ Error loading resume:", err);
                setFeedback({
                    summary: "Error loading resume. Showing fallback feedback.",
                    ATS: { score: 0, tips: ["Please try re-uploading your resume."] },
                    details: []
                });
            }
        };

        loadResume();
    }, [id]);

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">
                        Back to Homepage
                    </span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={imageUrl}
                                    className="w-full h-full object-contain rounded-2xl"
                                    title="resume"
                                />
                            </a>
                        </div>
                    )}
                </section>
                <section className="feedback-section">
                    <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            <Summary feedback={feedback} />
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        <img src="/images/resume-scan-2.gif" className="w-full" />
                    )}
                </section>
            </div>
        </main>
    );
};

export default Resume;
