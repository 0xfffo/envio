import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import Sidebar from "@layouts/partials/Sidebar";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
const { blog_folder, pagination } = config.settings;

const Home = ({
  banner,
  posts,
  featured_posts,
  recent_posts,
  categories,
  promotion,
}) => {
  // define state
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );
  const showPosts = pagination;

  return (
    <Base>
      {/* Banner */}
      <section className="section banner relative pb-10">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src={"/images/banner.jpg"}
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />

        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div className="mt-12 text-center lg:mt-0 lg:text-left lg:col-6">
              <div className="banner-title">
                {markdownify(banner.title, "h1", "text-white")}
                {markdownify(banner.title_small, "h2", "text-white")}
              </div>
              {markdownify(banner.content, "p", "mt-4 text-white")}
              <Link
                className="btn btn-primary mt-6"
                href={banner.button.link}
                rel={banner.button.rel}
              >
                {banner.button.label}
              </Link>
            </div>
            <div className="col-9 lg:col-6"></div>
          </div>
        </div>
      </section>

      <section className="section pb-0">
        <div className="container">
          <h2 className="flex text-center justify-center mb-4 text-[#0a265b]">
            WHAT WE DO
          </h2>
          <p className="mb-7">
            EarthKeepers Alliance commitment to environmental conservation,
            sustainable development, and creating a healthier planet for future
            generations. We are an organization dedicated to the world's
            environmental protection. We have been dedicated to the protection
            of Marine environment before, and have rescued and cleaned up a lot
            of polluted garbage. Now we are focused on the protection of land
            environment.
          </p>
          <div className="flex flex-col">
            <div className="border rounded-lg  px-4 bg-[#2ba283] text-white py-4 mb-4">
              <div className="font-bold">PRESERVING MARINE ECOSYSTEMS</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique.
              </div>
            </div>
            <div className="border rounded-lg  px-4 bg-[#2ba283] text-white py-4 mb-4">
              <div className="font-bold">PROTECTING TERRESTRIAL ECOSYSTEMS</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique.
              </div>
            </div>
            <div className="border rounded-lg  px-4 bg-[#2ba283] text-white py-4">
              <div className="font-bold">
                PROMOTING SUSTAINABLE AGRICULTURE AND LAND USE
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home main */}
      <section className="section">
        <div className="container">
          <div className="row items-start">
            <div className="mb-12 lg:mb-0">
              {/* Featured posts */}
              {featured_posts.enable && (
                <div className="section">
                  {markdownify(
                    featured_posts.title,
                    "h2",
                    "section-title decoration-solid"
                  )}
                  <div className="rounded border border-border p-6 dark:border-darkmode-border">
                    <div className="row">
                      <div className="md:col-6">
                        <Post post={featuredPosts[0]} />
                      </div>
                      <div className="scrollbar-w-[10px] mt-8 max-h-[480px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-theme-dark md:mt-0 md:col-6">
                        {featuredPosts
                          .slice(1, featuredPosts.length)
                          .map((post, i, arr) => (
                            <div
                              className={`mb-6 flex items-center pb-6 ${
                                i !== arr.length - 1 &&
                                "border-b border-border dark:border-darkmode-border"
                              }`}
                              key={`key-${i}`}
                            >
                              {post.frontmatter.image && (
                                <ImageFallback
                                  className="mr-3 h-[85px] rounded object-cover"
                                  src={post.frontmatter.image}
                                  alt={post.frontmatter.title}
                                  width={105}
                                  height={85}
                                />
                              )}
                              <div>
                                <h3 className="h5 mb-2">
                                  <Link
                                    href={`/${blog_folder}/${post.slug}`}
                                    className="block hover:text-primary"
                                  >
                                    {post.frontmatter.title}
                                  </Link>
                                </h3>
                                <p className="inline-flex items-center font-bold">
                                  <FaRegCalendar className="mr-1.5" />
                                  {dateFormat(post.frontmatter.date)}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Promotion */}
              {promotion.enable && (
                <Link href={promotion.link} className="section block pt-0">
                  <ImageFallback
                    className="h-full w-full"
                    height="115"
                    width="800"
                    src={promotion.image}
                    alt="promotion"
                  />
                </Link>
              )}

              {/* Recent Posts */}
              {recent_posts.enable && (
                <div className="section pt-0">
                  {markdownify(recent_posts.title, "h2", "section-title")}
                  <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                    <div className="row">
                      {sortPostByDate.slice(0, showPosts).map((post) => (
                        <div className="mb-8 md:col-6" key={post.slug}>
                          <Post post={post} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Pagination
                totalPages={Math.ceil(posts.length / showPosts)}
                currentPage={1}
              />
            </div>

            {/* sidebar */}
            <Sidebar
              className={"lg:mt-[9.5rem]"}
              posts={posts}
              categories={categories}
            />
          </div>
        </div>
      </section>

      <section className="section banner relative pb-10 overflow-hidden">
        <ImageFallback
          className="absolute top-0 left-0  bottom-0 z-[-1] w-full"
          src={"/images/JCRpanorama.jpg"}
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />

        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div className="mt-12 text-center lg:mt-0 lg:text-left lg:col-6">
              <div className="banner-title">
                {markdownify(banner.foot_title, "h1", "text-[#2ba283]")}
                {markdownify(banner.foot_title_small, "h2", "text-white")}
              </div>
              {markdownify(banner.foot_content, "p", "mt-4 text-white")}
            </div>
            <div className="col-9 lg:col-6"></div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  return {
    props: {
      banner: banner,
      posts: posts,
      featured_posts,
      recent_posts,
      promotion,
      categories: categoriesWithPostsCount,
    },
  };
};
