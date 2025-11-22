<script lang="ts">
    const reportBugExample = 'terkadang apabila'
</script>

<div class="flex flex-col gap-2 p-1 col-span-12 md:col-span-9 lg:col-span-9">
    <h1 id="home" class="text-lg font-semibold"> Home </h1>
    <p class="text-balance"> 
        Saia membuat webset ini hanya karna tertarik dengan fisika (kimia jg sih 😳).
        Maka dari itu, pasti banyak yang kurang dan mohon dimaklumi 😔.
        Kalo ingin memberi masukan bisa melalui form dibawah ini:
    </p>
    <!-- form suggestion -->
    <form class="flex flex-col gap-2" onsubmit={ev => ev.preventDefault()}>
        <!-- text input -->
        <div>
            <textarea id="suggestion" class="w-[95vw] md:w-[50vw] lg:w-[50vw] h-22 resize-none bg-gray-200 text-black p-1" minLength={4} maxLength={256} placeholder={reportBugExample}></textarea>
        </div>
        <!-- submit -->
        <div>
            <button type="submit" class="bg-darkgreen-4 text-black p-1 rounded-md cursor-pointer active:bg-darkgreen-4/75"> Kirim Saran </button>
        </div>
    </form>
    <!-- note -->
    <i> note: saia pemalas 💀 </i>
</div>