import React, { useState } from "react";
import "./AnimationShare.css";

const sampleAnimations = [
  {
    title: "Bouncing Ball",
    description: "A simple CSS bouncing ball.",
    embed: (
      <div className="bouncing-ball">
        <div className="ball"></div>
      </div>
    ),
    author: "Huy",
  },
  {
    title: "Animated Gradient",
    description: "Beautiful animated gradient background.",
    embed: (
      <div className="animated-gradient"></div>
    ),
    author: "Minh",
  },
];

export default function AnimationShare() {
  const [animations, setAnimations] = useState(sampleAnimations);
  const [form, setForm] = useState({ title: "", description: "", url: "", author: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.url) {
      setAnimations([
        ...animations,
        {
          title: form.title,
          description: form.description,
          embed: (
            <video controls width="200">
              <source src={form.url} />
              Your browser does not support the video tag.
            </video>
          ),
          author: form.author || "Anonymous",
        },
      ]);
      setForm({ title: "", description: "", url: "", author: "" });
    }
  };

  return (
    <div className="animation-share-container">
      <header>
        <h1>🎬 Animation Sharing Hub</h1>
        <p>Khám phá và chia sẻ các animation tuyệt đẹp!</p>
      </header>
      <section className="animation-list">
        {animations.map((anim, idx) => (
          <div className="animation-card" key={idx}>
            <h2>{anim.title}</h2>
            <div className="animation-embed">{anim.embed}</div>
            <p>{anim.description}</p>
            <span className="author">Tác giả: {anim.author}</span>
          </div>
        ))}
      </section>
      <section className="share-form">
        <h3>Chia sẻ animation của bạn</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Tên animation" required />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" required />
          <input name="author" value={form.author} onChange={handleChange} placeholder="Tên bạn (tùy chọn)" />
          <input name="url" value={form.url} onChange={handleChange} placeholder="Link video .mp4 hoặc GIF" required />
          <button type="submit">Chia sẻ!</button>
        </form>
      </section>
    </div>
  );
}