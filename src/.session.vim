let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/program/react/vite/satva/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
argglobal
%argdel
edit components/RegistrationList.tsx
argglobal
let s:l = 5 - ((4 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 5
normal! 0
tabnext 1
badd +23 api/api.ts
badd +11 utility.ts
badd +7 pages/Events.tsx
badd +24 pages/RegisterEvent.tsx
badd +2 api/request.ts
badd +2 main.tsx
badd +1 pages/Register.tsx
badd +40 pages/Login.tsx
badd +24 App.tsx
badd +33 pages/CreateEvent.tsx
badd +3 pages/UpdateEvent.tsx
badd +8 store.ts
badd +13 pages/Home.tsx
badd +61 App.css
badd +3 routes.ts
badd +8 components/ErrorField.tsx
badd +5 components/RegistrationList.tsx
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
