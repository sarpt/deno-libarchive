# deno-libarchive

A `LibArchive` class wrapping `libarchive` FFI implementation.

### methods

- `open(archivePath: string): { archive?: Deno.UnsafePointer, errMsg?: string }` -
  opens archive at specified path. Returns `errMsg` when unsuccessful, otherwise
  returns archive pointer
- `isArchive(archivePath: string): boolean` - tries to open an archive at
  specified path. Checks whether an archive is one of the skippable formats
  (supplied in constructor) - if it is, returns `false`. When archive can be
  opened and is not skippable, returns `true`.
- `listFiles(archivePath: string): string[]` - returns list of files in an
  archive. The list is empty if archive cannot be opened (TODO: change the
  behavior to return an error in such case)
- `async *walk(archivePath: string, outPath: string, keepUnpackedFiles: boolean): AsyncGenerator<ArchiveWalkEntry, Result, void>` -
  walks through the archive at `archivePath`, descending into archives and
  directories inside walked archives and extracting contents for handling at
  `outPath` (in-memory walking is currently not supported, only on-disk walking
  and access). For each entry (file, directory or archive), the generator
  returns `ArchiveWalkEntry`. If `keepUnpackedFiles` is `true`, then the
  generator will not remove entry file immediately after calling `next` on it
  (it will remain on-disk under `outPath`), otherwise the file will be deleted
  after calling `next`.
- `async *iterateContents(archivePath: string, outPath: string, keepUnpackedFiles?: boolean): AsyncGenerator<ArchiveContentsEntry, Result, void>` -
  iterates through the archive at `archivePath`. Very similar mechanism to
  `walk` however, this method does not descend into encountered archives.
- `close(): void` - closes `libarchive` that was opened by the constructor

### dependencies for running

- `deno` - tested on 1.17 and up
- `libarchive.so` - for archives handling

### permissions

- `unstable`
- `allow-ffi`
