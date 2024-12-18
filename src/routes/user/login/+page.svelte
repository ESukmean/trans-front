<div class="flex h-screen flex-col place-items-center bg-neutral-100">
	<div class="flex min-h-full flex-1 flex-col justify-center pb-12">
		<h1 class="py-10 text-center text-5xl font-bold">로그인</h1>
		<div class="background-blur-lg w-100 rounded bg-white shadow-sm">
			<div class="px-6 py-8">
				<form class="flex flex-col gap-2 tracking-tight" method="post" action="?/login">
					<label class="block">
						<span class="block py-1 font-bold">아이디</span>
						<input
							type="text"
							name="username"
							placeholder="아이디"
							class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 tracking-normal shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
							autofocus
							required
						/>
					</label>
					<label class="block">
						<span class="block py-1 font-bold">비밀번호</span>
						<input
							type="password"
							name="pass"
							placeholder="비밀번호"
							class="peer block w-full rounded-md border border-slate-300 bg-white px-2 py-2 tracking-normal shadow-sm invalid:border-rose-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
							minlength="8"
							required
						/>
						<p class="invisible mt-2 text-sm text-pink-600 peer-invalid:visible">
							비밀번호가 규칙에 맞지 않습니다 (최소 8자)
						</p>
					</label>
					<div class="mt-6 flex">
						<div class="flex min-h-full flex-1 flex-col justify-center">
							<button class="w-24 rounded bg-purple-500 px-4 py-2 text-white">로그인</button>
						</div>
						<div class="flex min-h-full flex-1 flex-col justify-center">
							<span class="block text-sm text-slate-500">Under Develop (2024 ~)</span>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
