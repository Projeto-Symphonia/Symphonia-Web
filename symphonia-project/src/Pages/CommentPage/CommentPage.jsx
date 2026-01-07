import "./style.css";
import api from "../../services/api";
import Navbar from "../../Components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import PagePost from "../../Components/PagePost/PagePost";
import { use, useEffect, useState } from "react";
import PageComment from "../../Components/PageComment/PageComment";
import { useAuth } from "../../context/AuthContext";

export default function CommentPage() {
    const { postID } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { user } = useAuth();

    const handleCreateComment = async () => {
        const text = newComment.trim();
        if (!text || !user) return;
        try {
            const res = await api.post(`/comments/criarcomment/${postID}`, {
                userID: user._id,
                comment: text,
            });
            const created = res.data?.newComment ?? null;
            setNewComment("");
            setComments((prev) => (created ? [...prev, created] : prev));
        } catch (e) {
            console.error("creating comment failed", e);
        }
    };

    useEffect(() => {
        api.get(`/posts`).then((response) => {
            const foundPost = response.data.find((p) => p._id === postID);
            setPost(foundPost);
        });

        api.get(`/comments/${postID}`).then((response) => {
            setComments(response.data);
        });
    }, [postID]);

    if (!post) return <div>Carregando...</div>;

    return (
        <div className="comment-page">
            <Navbar />
            <div className="foundpost-box">
                <PagePost
                    key={post._id}
                    post={post}
                    user={post.userID}
                    album={post.albumID}
                    music={post.musicID}
                    avaliation={post.avaliation}
                    title={post.title}
                    comment={post.comment}
                    comments={comments}
                />
            </div>
            <div className="comment-form">
                <textarea
                    className="comment-input"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escreva um comentário..."
                    rows={3}
                />
                <button
                    className="comment-button"
                    onClick={handleCreateComment}
                    disabled={!user || !newComment.trim()}
                >
                    Comentar
                </button>
            </div>
            <main className="comments-feed">
                {comments.map((comment) => (
                    <PageComment
                        key={comment._id}
                        post={post}
                        user={comment.userID}
                        title={comment.title}
                        comment={comment.comment}
                    />
                ))}
            </main>
        </div>
    );
}
