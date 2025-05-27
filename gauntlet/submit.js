document.querySelector("#submitForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const level_id = document.querySelector("#level_id").value;
  const level_name = document.querySelector("#level_name").value;
  const level_author = document.querySelector("#level_author").value;
  const difficulty = parseInt(document.querySelector("#difficulty").value);
  const stars = parseInt(document.querySelector("#stars").value);
  const gauntlet_id = document.querySelector("#gauntlet_id").value;
  const gauntlet_name = document.querySelector("#gauntlet_id").selectedOptions[0].text;
  const thumbFile = document.querySelector("#thumb").files[0];

  const fileName = `g_${Date.now()}_${thumbFile.name}`;
  const { data: storageData, error: storageError } = await supabase.storage
    .from("thumbnails")
    .upload(fileName, thumbFile);

  if (storageError) {
    return alert("Gagal upload gambar: " + storageError.message);
  }

  const thumb_url = storageData.path;

  const { error } = await supabase.from("submissions").insert([{
    level_id, level_name, level_author, difficulty, stars,
    gauntlet_id, gauntlet_name, thumb_url
  }]);

  if (error) {
    alert("Gagal submit data: " + error.message);
  } else {
    alert("Berhasil submit!");
    location.reload();
  }
});
