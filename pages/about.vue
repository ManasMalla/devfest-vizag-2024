<template>
    <v-container>
        <h1 class="mt-5">Behind the Experience</h1>
        <v-img :src="'/img/about/team.png'" cover
            style="height: 240px; width: 100%; margin: 16px 0; border-radius: 24px; object-position: 0%; border:1.5px solid #202023;" />
        <v-row style="justify-content: space-between; padding: 12px;">
            <v-col v-for="dev in [{ 'name': 'Manas Malla', 'role': 'Project Lead', 'image': 'manas.png' }, { 'name': 'Varshita Palleti', 'role': 'Project Lead', 'image': '' }, { 'name': 'Chandan Khamitkar', 'role': 'Project Lead', 'image': '' }, { 'name': 'Jayadhar Ummadisingu', 'role': 'Project Lead', 'image': '' },
            { 'name': 'Revanth Peethala', 'role': 'Project Lead', 'image': '' }, { 'name': 'Revanth Peethala', 'role': 'Project Lead', 'image': '' }
            ]">
                <div class="image-container text-center">
                    <v-img alt="frame" class="frame" src="/assets/img/frame.png"></v-img>
                    <v-img class="avatar" aspect-ratio="1" cover :alt="dev.name" :src="dev.image.length
                        ? '/img/about/' + dev.image
                        : '/img/common/avatar.png'
                        "></v-img>
                    <!-- <v-img :src="'/img/about/' + dev.image" style="border: 1.5px solid #202023;" /> -->
                    <h4 class="mt-4">{{ dev.name }}</h4>

                    <p style="font-size: 90%">{{ dev.role }}</p>
                </div>
            </v-col>
        </v-row>
        <div style="display: flex; column-gap: 48px; justify-content: space-between;">
            <p style="max-width: 450px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id consectetur
                nibh.
                Pellentesque nec nibh ut arcu hendrerit faucibus interdum ut ex. Mauris ultrices felis in erat rhoncus
                pellentesque. Phasellus nec bibendum nunc, a euismod purus. Vivamus sed nibh ligula. Maecenas placerat
                at
                eros
                vitae pharetra. Quisque elit turpis, scelerisque nec eleifend vel, faucibus eu sapien. Praesent eget
                ullamcorper
                felis. Sed dignissim ullamcorper risus ut facilisis. Aenean quis consectetur massa. Donec rhoncus lorem
                a
                sapien
                dictum fermentum. Praesent at maximus eros, at accumsan massa. Sed mattis lobortis tortor viverra
                mollis.
                <br /><br />
                Pellentesque ut augue blandit, pharetra nibh id, convallis libero. Sed elit elit, suscipit vel bibendum
                eget,
                aliquam a erat. Duis gravida leo sit amet egestas tincidunt. Nulla blandit tempus elit mattis aliquam.
                Proin
                purus sem, elementum a suscipit eget, venenatis sit amet leo. Quisque lacinia vulputate massa, gravida
                varius
                ipsum gravida vitae. Cras sit amet ipsum faucibus, efficitur turpis quis, volutpat lorem. Nam at
                fringilla
                nisl.
                Curabitur suscipit mi sit amet imperdiet vulputate. In nec bibendum nisl, sed dictum metus.
                <br /><br />
                Etiam mauris tortor, tincidunt id nisl a, dictum fringilla lacus. Integer finibus ac nisl et feugiat.
                Suspendisse vitae rutrum lacus. Fusce at consectetur est. Fusce convallis orci vitae mauris aliquam
                pharetra.
                Nunc maximus est sed neque facilisis mattis. Nunc nec consequat felis. Vivamus varius quam lectus, ac
                hendrerit
                nunc faucibus eget. Quisque et aliquam erat. Cras scelerisque, sapien vel pharetra eleifend, turpis diam
                maximus
                leo, sed scelerisque risus urna quis purus. Vivamus aliquam consequat massa ut tempus. In at placerat
                nulla.
                Integer ultrices risus quis sem vulputate, at faucibus sem dapibus.
                <br /><br />

            </p>
            <p style="max-width: 450px;">Maecenas non nisi erat. Curabitur eu tempus sapien, at egestas ipsum. Sed et
                fringilla massa. Nunc ac
                eleifend
                massa, a commodo urna. Mauris nulla metus, lobortis eu lectus id, viverra interdum lorem. Proin tortor
                velit,
                luctus ut tellus ac, volutpat eleifend nulla. Pellentesque placerat pretium quam in euismod.
                Pellentesque
                sed
                auctor eros, ac feugiat orci. Aenean nulla neque, efficitur non condimentum id, fermentum a urna.
                Curabitur
                mattis enim lorem, maximus dapibus lacus ullamcorper vitae.
                <br /><br />
                Curabitur gravida facilisis lectus. Duis congue sed urna eleifend ultricies. Suspendisse interdum dolor
                et
                tempus interdum. In efficitur, velit ac dapibus tincidunt, risus massa porttitor massa, non viverra
                mauris
                nibh
                eu risus. Morbi aliquet purus eros. Morbi id nibh laoreet, scelerisque neque eu, porta lectus. Curabitur
                ut
                odio
                eros. Fusce at ultrices urna. Morbi pulvinar urna ex, a malesuada tortor ultrices vitae. In sed eros non
                tellus
                vulputate consectetur vel lobortis dolor. Phasellus et fermentum orci, eget tincidunt dui. Interdum et
                malesuada
                fames ac ante ipsum primis in faucibus. Vivamus ante lorem, tincidunt ut metus eget, lobortis
                pellentesque
                mauris. Aenean blandit posuere libero vel lacinia. Maecenas et ultrices felis, nec laoreet ipsum.
                Pellentesque
                vitae metus felis.
            </p>
        </div>
    </v-container>
</template>

<style scoped>
.image-container {
    position: relative;
    width: 80%;
    margin-top: 20px;
}

.avatar {
    width: 100%;
    height: auto;
    position: relative;
    border: 1px solid white;
}

.frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
}
</style>