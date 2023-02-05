import React from "react";

import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }: { data: any; title: any }) => {
  if (data?.length > 0)
    return data.map((post: any) => <Card key={post._id} {...post} />);

  return (
    <h2 className="mt-5 font-bold text-gray-700 text-xl uppercase">{title}</h2>
  );
};

function Home() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [allPosts, setAllPosts] = React.useState<[] | null>(null);

  const [searchText, setSearchText] = React.useState<string>("");
  const [searchedResults, setSearchedResults] = React.useState(null);
  const [searchTimeout, setSearchTimeout] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dall-e-qp0o.onrender.com/api/v1/post",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts?.filter(
          (item: any) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults as any);
      }, 500)
    );
  };

  return (
    <div>
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-bold text-gray-800 text-3xl">
            Community Showcase
          </h1>
          <p className="mt-2 text-gray-500  max-w-[500px]">
            Browse trough a collection of imaginative and visually stunning
            images geenerated by DALL-E AI
          </p>
        </div>

        <div className="mt-16">
          <FormField
            labelName="Search Posts"
            type="text"
            name="text"
            placeholder="Search Posts"
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-gray-500 text-xl mb-3">
                  Showing results from{" "}
                  <span className="text-black">{searchText}</span>
                </h2>
              )}
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {searchText ? (
                  <RenderCards
                    data={searchedResults}
                    title="No search results found"
                  />
                ) : (
                  <RenderCards data={allPosts} title="No posts found" />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
