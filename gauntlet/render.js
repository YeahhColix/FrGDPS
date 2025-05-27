window.addEventListener("DOMContentLoaded", async () => {
  const { data: submissions, error } = await supabase
    .from("submissions")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    document.body.innerHTML = "Gagal memuat data.";
    return;
  }

  const container = document.getElementById("levelGrid");
  submissions.forEach((s) => {
    container.innerHTML += `
      <div class="card">
        <img src="https://wkrhwqyglhckdphrogms.supabase.co/storage/v1/object/public/thumbnails/${s.thumb_url}" />
        <div class="info">
          <h3>${s.level_name}</h3>
          <p>by ${s.level_author}</p>
          <p>Difficulty: ${s.difficulty} — ⭐${s.stars}</p>
          <p>Gauntlet: ${s.gauntlet_name}</p>
          <button onclick="navigator.clipboard.writeText('${s.level_id}')">Salin ID</button>
        </div>
      </div>
    `;
  });
});
