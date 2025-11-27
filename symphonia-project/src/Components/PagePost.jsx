export default function PagePost({ album, avaliation, comment, user, title }) {
    if (user == null) {
        user = "unkown";
    }
    return (
        <div>
            <h1>{user}</h1>
            <p>{comment}</p>
            <p>{avaliation}</p>
            <p>{album.title}</p>
        </div>
    );
}
